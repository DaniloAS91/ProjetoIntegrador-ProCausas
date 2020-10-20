import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  tmp: any

  constructor() { }

  ngOnInit() {
    const themeMap = {
      dark: "light",
      light: "solar",
      solar: "dark"
  };

  const theme = localStorage.getItem('theme') ||
      (this.tmp = Object.keys(themeMap)[0],
          localStorage.setItem('theme', this.tmp),
          this.tmp);
  const bodyClass = document.getElementById("teste").classList
  bodyClass.add(theme);

    function toggleTheme() {
      const current = localStorage.getItem('theme');
      const next = themeMap[current];

      bodyClass.replace(current, next);
      localStorage.setItem('theme', next);
  }

  document.getElementById('themeButton').onclick = toggleTheme;
  }


}
