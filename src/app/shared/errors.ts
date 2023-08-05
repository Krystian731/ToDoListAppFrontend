export const errorsUser:{[key: string]: string} = {
  required: 'Nazwa użytkownika nie może być pusta!',
  minlength: 'Nazwa użytkownika musi zawierać conajmniej 4 znaki',
  userNotExists: 'Złe dane logowania',
  maxlength: 'Nazwa użytkownika nie może być dłuższa niż 20 znaków',
  usernameTaken: 'Użytkownik jest już zarejestrowany'
}

export const errorsTask:{[key: string]: string} = {
  required: 'Nazwa zadania nie może być pusta!',
  minlength: 'Nazwa zadania musi zawierać conajmniej 4 znaki',
  maxlength: 'Nazwa zadania nie może być dłuższa niż 20 znaków',
}
