import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  isLightTheme = false;
  authService= inject(AuthService);
  router = inject(Router);

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('light-theme', this.isLightTheme);
  }

  changeColor(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedColor = inputElement.value;
    console.log('Selected color:', selectedColor);

    // Generate a beautiful color combination
    const colorCombination = this.generateColorCombination(selectedColor);

    // Safeguard: If primary and text colors are identical, adjust text color slightly.
    let textColor = colorCombination.text;
    if (textColor.toLowerCase() === colorCombination.primary.toLowerCase()) {
      const [h, s, l] = this.hexToHsl(textColor);
      textColor = this.adjustColor(textColor, l > 50 ? -20 : 20);
    }

    // Apply the generated colors to CSS variables
    document.documentElement.style.setProperty('--dynamic-primary-color', colorCombination.primary);
    document.documentElement.style.setProperty('--dynamic-bg-color', colorCombination.background);
    document.documentElement.style.setProperty('--dynamic-text-color', textColor);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  generateColorCombination(baseColor: string): { primary: string, background: string, text: string } {
    const hsl = this.hexToHsl(baseColor);
    
    // Use the base color as primary.
    const primaryColor = baseColor;
    // Create a background color by rotating the hue 180°.
    const backgroundColor = this.hslToHex([(hsl[0] + 180) % 360, hsl[1], hsl[2]]);
    // Choose a text color based on contrast with the background.
    const textColor = this.chooseContrastText(backgroundColor);

    return {
      primary: primaryColor,
      background: backgroundColor,
      text: textColor
    };
  }

  /**
   * Returns either black or white depending on the luminance of the provided color.
   */
  chooseContrastText(hex: string): string {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate the relative luminance of the color.
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // For light backgrounds, return black. For dark backgrounds, return white.
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  getComplementaryColor(hex: string): string {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const complementaryR = (255 - r).toString(16).padStart(2, '0');
    const complementaryG = (255 - g).toString(16).padStart(2, '0');
    const complementaryB = (255 - b).toString(16).padStart(2, '0');

    return `#${complementaryR}${complementaryG}${complementaryB}`;
  }

  adjustColor(hex: string, amount: number): string {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  hexToHsl(hex: string): [number, number, number] {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  }

  hslToHex(hsl: [number, number, number]): string {
    const [h, s, l] = hsl;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }


}