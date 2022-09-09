const captureUserSignUp = (e) => {
  e.preventDefault();
  let input = {
    firstName: e.target.form[0].value,
    lastName: e.target.form[1].value,
    username: e.target.form[2].value,
    email: e.target.form[3].value,
    password: e.target.form[4].value,
  };
  return input;
};


const setSignIn = (e) => {
  e.preventDefault();
  let data = {
    email: e.target.form[0].value,
    password: e.target.form[1].value,
  };
  return data;
}







export {
    captureUserSignUp,
    setSignIn
}
