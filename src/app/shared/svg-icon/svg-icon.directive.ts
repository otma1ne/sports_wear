import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[svgIcon]',
})
export class SvgIconDirective implements OnInit {
  @Input() svgIcon: string = '';
  @Input() color: string = '';
  @Input() size: string = '20';
  @Input() stroke: string = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const iconUrl = `assets/icons/${this.svgIcon}.svg`;

    fetch(iconUrl)
      .then((response) => response.text())
      .then((svgString) => {
        const div = document.createElement('div');
        div.innerHTML = svgString;

        const svgElement = div.querySelector('svg');
        if (svgElement) {
          svgElement.style.fill = this.color;
          svgElement.style.stroke = this.stroke;
          svgElement.setAttribute('width', this.size);
          svgElement.setAttribute('height', this.size);
          this.elementRef.nativeElement.appendChild(svgElement);
        }
      });
  }
}
