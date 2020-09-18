export const getAllUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/getAllUsers`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in Getting all the users", err);
    });
};

export const deleteUser = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/deleteUser/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in deleting the user", err);
    });
};

export const editUser = (id, user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/updateUser/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in editing the user", err);
    });
};

export const addUser = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/createUser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in creating the user", err);
    });
};

export const getUser = (userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/getUser/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in getting the user", err);
    });
};

export const addTask = (task) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/createTask`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in creating the task", err);
    });
};

export const deleteTask = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/deleteTask/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in deleting the task", err);
    });
};

export const getAllTasks = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/getAllTasks`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in Getting all the tasks", err);
    });
};

export const removeUser = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/removeUser/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in removing the user", err);
    });
};

export const editTask = (id, task) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/updateTask/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in editing the task", err);
    });
};

export const assignTask = (taskId, userId) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/admin/addUser/${taskId}/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in add user to the task", err);
    });
};

export const getTask = (taskId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/admin/getTask/${taskId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("Error in getting the task", err);
    });
};
