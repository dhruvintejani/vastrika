export function getEmailError(email: string) {
  const value = email.trim();

  if (!value) return 'Email address is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';

  return '';
}

export function getNameError(name: string) {
  const value = name.trim();

  if (!value) return 'Full name is required';
  if (value.length < 2) return 'Full name must be at least 2 characters';
  if (!/^[A-Za-z\s.'-]+$/.test(value)) return 'Full name can contain only letters';

  return '';
}

export function getPhoneDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 10);
}

export function getPhoneError(phone: string, required = true) {
  const digits = phone.replace(/\D/g, '');

  if (!digits) return required ? 'Phone number is required' : '';
  if (digits.length < 10) return 'Phone number must be 10 digits';
  if (digits.length > 10) return 'Phone number cannot be more than 10 digits';

  return '';
}

export function getPasswordError(password: string) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password needs at least one number';

  return '';
}

export function getConfirmPasswordError(password: string, confirmPassword: string) {
  if (!confirmPassword) return 'Confirm password is required';
  if (password !== confirmPassword) return 'Passwords do not match';

  return '';
}
