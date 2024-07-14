import { SigninInput, SignupInput } from "@neom009/medium-common";
import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {BACKEND_URL} from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setpostInputs] = useState<SigninInput | SignupInput>({
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  async function sendRequest(){
    try{
      const res=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
      const jwt=res.data;
      localStorage.setItem("token",jwt);
      navigate('/blogs');
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-4xl font-extrabold">Create an account</div>
            <div className="text-slate-500 ">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type==="signin"?"Sign up":"Sign in"}
              </Link>
            </div>
          </div>
          <div className="grid-rows-2 pt-4">
            <LabledInput
              label="Email"
              placeholder="Enter your email.."
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
              type="text"
            />
            <LabledInput
              label="Password"
              placeholder="Enter your password.."
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
              type="password"
            />
            <button
              onClick={sendRequest}
              type="button"
              className="text-white mt-5 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabledInputType {
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
}

function LabledInput({ label, placeholder, onChange, type }: LabledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold pt-2">{label}</label>
      <input
        type={type}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
