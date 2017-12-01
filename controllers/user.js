const setUser = require('../models/insertdata');
const randomUser = require('../mock/mocks');
const adminPrivilege = require('../server/auth/usertype');

async function add (ctx) {
  const data = await setUser.addUser(randomUser.user) // to be replaced with ctx.request.body
  if (data)
    ctx.status = 200;
  else
    ctx.body = 'This user already exists';
}

async function edit (ctx) {
  const isAdmin = await adminPrivilege(ctx.headers.authorization.slice(7))
  if (!isAdmin) {
    const data = await setUser.editUser({email: 'godfrey_okuneva25@yahoo.com'}); // to be replaced with ctx.request.body
    if (!data) {
      ctx.status = 401;
    } else if (data == 'err') {
      ctx.status = 500;
    } else {
      ctx.status = 200;
    }
  } else {
    ctx.status = 403 //In this case an admin tried to access to a user page. Status 403: forbidden
  }
}


async function signup (ctx) {
  const userId = ctx.request.query;
  const data = await setUser.signup({email: 'russel.medhurst@gmail.com', password:"hellouser",}, userId); // to be replaced with ctx.request.body
  if (!data) {
    ctx.status = 401;
  } else {
    ctx.status = 200;
  }
}

module.exports = {
  add,
  edit,
  signup,
}
