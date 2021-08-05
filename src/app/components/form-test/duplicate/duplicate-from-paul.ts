import { AbstractControl, FormArray, ValidationErrors, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { preventNullWithEmptyString } from "../helpers";


export function duplicatedFieldInNeighborFormValidator(formArray: FormArray, fieldName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      // * 주의사항: 업데이트하고 다시 평가하는 과정에서 무한 루프가 일어나 validator 함수 안에서 updateValueAndValidity 메서드 사용하기 어려움
  
      // 1. 모든 이름 필드를 순회하면서 이름을 확인 (v)
      // 2. 이름, 번호 매칭하는 객체 생성 (v)
      // 3. 1개에서 2개가 될 때 먼저 작성된 필드를 찾아서 다시 업데이트 (v)
      // 4. 2개에서 1개가 될 때 남아있는 인풋의 에러를 제거 (v)
      // 5. 중복 에러가 있는 상태에서 새로운 에러가 나타났을때 기존 에러의 값이 전부 바뀌는 현상 수정 (v)
      // 6. 현재 필드 값이 없는 경우에는 바로 리턴을 함, 따라서 한 글자만 입력했을 때 중복이 일어나면 4번의 2개 -> 1개 문제가 다시 일어남 (-)
  
      const currentValue = preventNullWithEmptyString(control.value);
  
      const namesCountObj = formArray.controls.reduce((acc: any, form, idx: number) => {
        const fControl = form.get(fieldName) as FormControl;
        const name = preventNullWithEmptyString(fControl.value) as string;
  
        // 현재 수정 중인 인풋은 control과 fControl의 값이 싱크가 안되서 현재 값을 미리 넣어주고 카운트에서 스킵
        if (idx === 0) {
          acc[currentValue] = 1;
        }
        if (fControl === control) { return acc; }
  
        if (!acc[name]) {
          acc[name] = 1;
        } else {
          acc[name] += 1;
        }
  
        return acc;
      }, {});
  
      // 3, 4번 문제 상황 처리
      const namesCountTwo: string[] = [];
      const namesCountOne: string[] = [];
      for (let [k, v] of Object.entries(namesCountObj)) {
        if (v === 1) {
          namesCountOne.push(k)
        } else if (v === 2) {
          namesCountTwo.push(k);
        }
      }
  
      formArray.controls.forEach(form => {
        const fControl = form.get(fieldName) as FormControl;
        const fValue = preventNullWithEmptyString(fControl.value) as string;
  
        if (fControl === control) { return; }
  
        // (중복) 에러가 없는 상태에서 두개가 되어서 기존에 입력한 것에 에러를 표시해야하는 경우
        if (namesCountTwo.includes(fValue)) {
          let errors;
  
          if (!fControl.errors) {
            errors = { duplicated: { value: fControl.value } };
          } else {
            errors = { ...fControl.errors, duplicated: { value: fControl.value } };
          }
  
          fControl.setErrors(errors);
        }
  
        // (중복) 에러인 필드 값이 2개 있는 상태에서 1개로 줄어든 경우
        if (namesCountOne.includes(fValue)) {
  
          if (fControl.errors && fControl.errors.duplicated) {
            delete fControl.errors.duplicated;
  
            const remainedErrorsCount = Object.entries(fControl.errors).length;
            if (!remainedErrorsCount) {
              fControl.setErrors(null);
            }
          }
        }
      });
  
      // 글자가 없는 경우 맨 위에서 중복 처리를 하지 않기 위해 맨 위에 두었던 코드
      // 한 글자 중복에서 글자를 지우는 경우 4번 문제(2개 -> 1개 문제)를 처리를 해주어야해서 아래로 옮김
      if (!currentValue) { return null; }
  
      return namesCountObj[currentValue] >= 2 ? { duplicated: { value: currentValue } } : null;
    };
  }