
const base_url = "https://notes-api.dicoding.dev/v1";

const home = 'Home';
const register = 'Register';
const login = 'Login';

const BASE = "Notes App - "

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID")
};


export{
  base_url,
  home,
  register,
  login,
  BASE,
  formatDate,
};