import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  zoomLevel = 0;
  isImageDragging = false;
  initialMouseX = 0;
  initialMouseY = 0;
  initialImageX = 0;
  initialImageY = 0;
  clickTimer: ReturnType<typeof setTimeout> | undefined;

  zoomImage() {
    const imgContainer = document.querySelector('.img__container');
    const img = document.querySelector('.img__container img') as HTMLElement;

    console.log('zoomImage');
    imgContainer!.classList.remove(`zoom-${this.zoomLevel}`);
    this.zoomLevel = this.getNextZoomLevel(this.zoomLevel);
    imgContainer!.classList.add(`zoom-${this.zoomLevel}`);
    if (this.zoomLevel === 0) {
      img.style.transform = 'translate(-50%, -50%)';
    }
  }

  getNextZoomLevel(currentLevel: number): number {
    if (currentLevel === 0) {
      return 1;
    } else if (currentLevel === 1) {
      return 2;
    } else {
      return 0;
    }
  }

  onImageDown(event: MouseEvent | TouchEvent) {
    console.log('onImageDown');
    event.preventDefault();
    this.isImageDragging = true;

    if (event instanceof MouseEvent) {
      this.initialMouseX = event.clientX;
      this.initialMouseY = event.clientY;
    } else if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      this.initialMouseX = touch.clientX;
      this.initialMouseY = touch.clientY;
    }

    const img = document.querySelector('.img__container img');
    const transformMatrix = getComputedStyle(img!).transform;
    const matrix = new DOMMatrix(transformMatrix);
    this.initialImageX = matrix.e;
    this.initialImageY = matrix.f;

    this.clickTimer = setTimeout(() => {
      this.clickTimer = undefined;
    }, 120);
  }

  onImageMove(event: MouseEvent) {
    if (this.isImageDragging && this.zoomLevel > 0) {
      console.log('onImageMove');
      const deltaX = event.clientX - this.initialMouseX;
      const deltaY = event.clientY - this.initialMouseY;
      const newImageX = this.initialImageX + deltaX;
      const newImageY = this.initialImageY + deltaY;
      const img = document.querySelector('.img__container img') as HTMLElement;
      img.style.transform = `translate(${newImageX}px, ${newImageY}px)`;
    }
  }

  onImageTouchMove(event: TouchEvent) {
    if (this.isImageDragging && this.zoomLevel > 0) {
      console.log('onImageTouchMove');
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.initialMouseX;
      const deltaY = touch.clientY - this.initialMouseY;
      const newImageX = this.initialImageX + deltaX;
      const newImageY = this.initialImageY + deltaY;
      const img = document.querySelector('.img__container img') as HTMLElement;
      img.style.transform = `translate(${newImageX}px, ${newImageY}px)`;
    }
  }

  onImageUp() {
    console.log('onImageUp');
    this.isImageDragging = false;

    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = undefined;
      this.zoomImage();
    }
  }
}
