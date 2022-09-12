import { createClient } from "@supabase/supabase-js";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

export const userSignUp = async (
  firstName,
  lastName,
  username,
  email,
  password
) => {
  const body = { firstName, lastName, username, email, password };
  await fetch("http://localhost:3001/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log("user created")
};

// export const userSignIn = async (email, password) => {
//   const body = { email, password };
//   await fetch("http://localhost:3001/sign_in", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
// };

export const userSignIn = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  });
  if (error) {
    console.log("sign in failed");
    return error;
  }
  return user;
};

export const userSignOut = async (navigate) => {
    const { error, session } = await supabase.auth.signOut()
    if (error) {
        console.log(error)
        return error
    } else {
        console.log(session)
        console.log('signed out')
        window.alert("You have been signed out!")
        navigate("/")
    }
}

export const trainerDropDown = async () => {
    let { data: ptTable, error } = await supabase
        .from('ptTable')
        .select('id,ptName')
    if (ptTable) {
        return ptTable
    } else {
        console.log(error)
    }
}

export const findUser = async () => {
    const { data } = await supabase.from('userTable').select()
    console.log(data)
}

export const setFavoriteWorkouts = async () => {
    const { data, error } = await supabase.from('favoriteWorkouts').insert([
        {
            created_at: new Date(),
            updated_at: new Date(),
            workoutID: '2407',
            gif: 'http://d205bpvrqc9yn1.cloudfront.net/2407.gif',
            workoutName: 'barbell biceps curl (with arm blaster)',
            targetMuscle: 'biceps',
        },
    ])
    if (data === true) {
        console.log(data)
    } else {
        console.error(error)
    }
}

export const addAccountInformation = async (
    height,
    gender,
    weight,
    bmi,
    age,
    bodyFat,
    totalBurnedCalories,
    personalTrainer
) => {
    console.log(supabase.auth)
    const { data, error } = await supabase.from('accountInfo').insert([
        {
            created_at: new Date(),
            updated_at: new Date(),
            height: height,
            gender: gender,
            weight: weight,
            bmi: bmi,
            age: age,
            totalBurnedCalories: totalBurnedCalories,
            bodyFat: bodyFat,
            personalTrainer: personalTrainer,
            userID: supabase.auth.currentUser.id
        },
    ])
    if (data) {
        console.log('account info: ', data)
    } else console.log(error)
}