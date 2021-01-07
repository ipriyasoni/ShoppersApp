import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  img_url: string = "assets/images/blog_1.jpg";
  title = "Home Page";
  constructor() { 

  }

  ngOnInit() {
  }

  btnClick(demo_field) {
    console.log('Button clicked');
    console.log(demo_field);
  }

}
