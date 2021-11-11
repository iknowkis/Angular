import { Component, Input } from "@angular/core";

export class Post {
    title!: string;
    content!: string;
    date!: any;
}

export class Comments {
    user!: string;
    comment!: string;
    date!: any;
}

@Component ({
    template: ''
  })
export class Infor {
    @Input() name!: string;
    @Input() age!: number;
    @Input() mobile!: any;
}


export class TodoList {
    todo!: string;
    content!: string;
}