import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SettingsService } from './services/service.index';
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    public _ajustes: SettingsService
  ) { }

  ngAfterViewInit() {

    $(function () {
      $('#sidebarnav').AdminMenu();
    });

    $('.right-side-toggle').click(function () {
      $('.right-sidebar').slideDown(50);
      $('.right-sidebar').toggleClass('shw-rside');
    });

    let set = function () {
      let width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      let topOffset = 0;
      if (width < 1170) {
        $('body').addClass('mini-sidebar');
        $('.navbar-brand span').hide();
        $('.sidebartoggler i').addClass('ti-menu');
      } else {
        $('body').removeClass('mini-sidebar');
        $('.navbar-brand span').show();
      }

      let height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
      height = height - topOffset;
      if (height < 1) { height = 1; }
      if (height > topOffset) {
        $('.page-wrapper').css('min-height', (height) + 'px');
      }

    };
    $(window).ready(set);
    $(window).on('resize', set);

    $('.sidebartoggler').on('click', function () {
      if ($('body').hasClass('mini-sidebar')) {
        $('body').trigger('resize');
        $('body').removeClass('mini-sidebar');
        $('.navbar-brand span').show();

      } else {
        $('body').trigger('resize');
        $('body').addClass('mini-sidebar');
        $('.navbar-brand span').hide();
      }
    });

    $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
      $('.app-search').toggle(200);
    });

  }

  ngOnInit(): void {
  }

}
