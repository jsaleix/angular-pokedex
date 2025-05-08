import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-base-modal',
  imports: [],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.css',
})
export class BaseModalComponent {
  private dialogRef = viewChild<ElementRef<HTMLDialogElement>>('modalElement');
  modalState = input(false);
  onCloseModal = output();

  constructor() {
    effect(() => {
      if (this.modalState()) {
        this.openModal();
      } else {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.dialogRef()?.nativeElement.showModal();
  }

  closeModal() {
    this.dialogRef()?.nativeElement.close();
    this.onCloseModal.emit();
  }
}
