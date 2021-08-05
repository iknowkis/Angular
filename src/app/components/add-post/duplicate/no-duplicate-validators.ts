import { AbstractControl, ValidatorFn, FormGroup, FormArray, FormControl } from "@angular/forms";


function getRootCtrlAndDepth (ctrl:AbstractControl):[FormGroup|FormArray, number] {
  let root:FormGroup|FormArray = ctrl.parent;
  let depth = 1;
  while (root.parent) {
    root = root.parent;
    depth ++;
  }

  return [root, depth];

}

/**
 * 
 * @param ctrl 
 * @param maxDepth 
 * @param mapping 
 */
function mapDescendants (root:FormArray|FormGroup, maxDepth?:number, mapping:{[steps:string]:AbstractControl} = root.controls as any) {
  // get the mapping of the same depth siblings
  let i = 1; 

  // loop and go down the family tree until it reaches the same depth
  while (typeof maxDepth === 'undefined' || i <= maxDepth) {

    // filter ctrls that can go another step down. 
    const moreToGoList = Object.entries(mapping).filter(([_, parentCtrl])=>{
      return parentCtrl instanceof FormArray || parentCtrl instanceof FormGroup;
    }) as [string, FormArray|FormGroup][];

    // if there is no more, you hit the bottom. break the loop.
    if (moreToGoList.length === 0) break;

    moreToGoList.forEach(([steps, parentCtrl])=>{

      // register the lower depth ctrls
      Object.entries(parentCtrl.controls).forEach(([step, childCtrl])=>{

        mapping[`${steps}.${step}`] = childCtrl;

      });

      // remove all the currently iterated depth ctrls
      delete mapping[steps];

    });
  }
  return mapping;
}


function getSiblingCtrls (ctrl:FormControl, strOrRegexOrFn?:string|RegExp|((key:string) => boolean)) {
  const [root, depth] = getRootCtrlAndDepth(ctrl);
  let mappings = mapDescendants(root, depth);

  return Object.entries(mappings)
  .filter(([steps, ctrl])=>{

    // Different depth ctrls.  
    if (steps.split('.').length !== depth) return false;

    // If it's not formControl, pass.
    if (!(ctrl instanceof FormControl)) return false; 

    // If strOrRegexOrFn is set to specify ctrls to compare
    // Check them against it.
    if (typeof strOrRegexOrFn !== 'undefined') {
      const lastStep = steps.split('.').pop();
      if (typeof strOrRegexOrFn === 'string' && strOrRegexOrFn !== lastStep) return false;
      if (typeof strOrRegexOrFn === 'function'&& !strOrRegexOrFn(lastStep)) return false;
      if (strOrRegexOrFn instanceof RegExp && !strOrRegexOrFn.test(lastStep)) return  false;
    }
    return true;
  })
  .map(([_, c])=>c as FormControl)
  
  // filter out self
  .filter(c=>c !== ctrl);
}

/**
 * 
 * @param strOrRegexOrFn provide this if you want to select ctrls to compare. 
 * if you leave this value at undefined, validator will check all the formControls at the same depth as the target formControl. 
 * @returns  null or { duplicate : string }
 */
export function NoDuplicateValidatorV2Fn (strOrRegexOrFn?:string|RegExp|((key:string) => boolean)):ValidatorFn {
  return (targetCtrl:FormControl)=>{

    // if this ctrl is standalone, stop here.
    if (!targetCtrl.parent)  return null;

    let error = null;
    const newValue = targetCtrl.value;
    const oldValue = targetCtrl.errors?.duplicate;
    const siblingCtrls = getSiblingCtrls(targetCtrl, strOrRegexOrFn);



    // [OLD VALUE HANDLLING starts]
    if (
      oldValue && // if this ctrl HAD a duplicate error
      oldValue !== newValue // but HAS been updated to a different value
    ) {
      
      // get sibling ctrls with oldValue
      const siblingCtrlsWithOldValue = siblingCtrls.filter(siblingCtrl=>siblingCtrl.errors?.duplicate === oldValue)

      
      // Cancel siblings errors, if there is only one sibling with the old value, .      
      if (siblingCtrlsWithOldValue.length === 1) { 
        
        const [siblingCtrl] = siblingCtrlsWithOldValue;

        let siblingErrors = siblingCtrl.errors;
        delete siblingErrors['duplicate'];
        siblingCtrl.setErrors(Object.keys(siblingErrors).length === 0 ? null : siblingErrors);
      }
    }
    // [OLD VALUE HANDLLING ends]



    // [NEW VALUE HANDLLING starts]
    if (newValue) { // Duplicate error only exists when there is a value set.

      // get sibling ctrls with the same value.
      const siblingCtrlsWithNewValue = siblingCtrls
      .filter(
        siblingCtrl => siblingCtrl.value === newValue 
      );

      // if any found 
      // set errors on the siblings
      // and set the error object
      if (siblingCtrlsWithNewValue.length !== 0) {
        siblingCtrlsWithNewValue.forEach(c =>
          c.setErrors({ ...c.errors, duplicate: newValue })
        );
        error = {
          duplicate: newValue
        };
      } 
    }
    // [NEW VALUE HANDLLING ends]
    


    
    return error;
  }



}