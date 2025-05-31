import {
  Component,
  ElementRef,
  forwardRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  styleUrl: './input.component.css',
  template: `
    <input
      #inputRef
      [class]="
        'border-1 border-gray-500 shadow-md rounded-md w-full px-3 py-1 outline-none placeholder:text-gray-400 ' +
        css()
      "
      type="text"
      [value]="value()"
      (input)="onInput($event)"
      (blur)="onTouched()"
      [placeholder]="placeholder()"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  value = signal<string>('');
  placeholder = input<string>();
  css = input<string>();
  ref = input<ElementRef>();
  inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  private onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Quand l'utilisateur tape
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  focus(): void {
    this.inputRef()?.nativeElement.focus();
  }
}
