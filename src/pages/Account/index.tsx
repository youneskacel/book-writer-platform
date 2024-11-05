import React from "react";
import { usersApi } from "../../store/query/users";
import { useAuth } from "../../context/auth/AuthContext";

const Account = () => {
  const { user, loadUser } = useAuth();

  const [newUserName, setNewUserName] = React.useState<string>('')

  const [updateUser] = usersApi.useUpdateUserMutation();


  const handleSubmit = async () => {
    if(newUserName === '') return;
    await updateUser({
      ...user,
      name: newUserName,
      password: undefined
    }).unwrap()
    loadUser()
  }
  return (
    <div className="w-full h-full p-3 flex flex-col items-start gap-[25px]">
      <p className="text-[32px] font-bold">Manage Account</p>

      <div className="flex flex-col items-start gap-1">
        <p className="text-sm">Name: </p>
        <input
          type="text"
          className="p-2 shadow rounded"
          value={newUserName !== '' ? newUserName : user?.name}
          onChange={e => setNewUserName(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="text-sm">email: </p>
        <input
          type="text"
          value={user?.email}
          disabled
          className="p-2 shadow rounded "
        />
      </div>

      <div className="flex items-center w-full justify-end">
        <button
          className="text-lg text-medium rounded shadow bg-gray-100 hover:bg-gray-200 p-4"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Account;
