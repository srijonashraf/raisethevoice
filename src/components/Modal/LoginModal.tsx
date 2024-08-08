import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "store/api/auth";

interface FormValuesType {
  full_name?: string;
  email: string;
  password: string;
}

const initialFormValues = {
  full_name: "",
  email: "",
  password: "",
};

const LoginModal = () => {
  const [modalType, setModalType] = useState<string>("signin");
  const [formValues, setFormValues] =
    useState<FormValuesType>(initialFormValues);
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  useEffect(() => {
    setFormValues(initialFormValues);
  }, [modalType]);

  const handleSignin = () => {
    loginUser({
      password: formValues.password,
      email: formValues.email,
      username: formValues.email,
    });
  };

  const handleSignup = () => {
    registerUser({
      full_name: formValues.full_name,
      email: formValues.email,
      password: formValues.password,
      username: formValues.email,
    });
  };

  return (
    <div>
      <div className="container flex flex-col mx-auto rounded-lg">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign {modalType === "signin" ? "In" : "Up"}
                </h3>
                <p className="mb-4 text-grey-700">
                  {modalType === "signin"
                    ? "Enter your email and password"
                    : "Create a new account"}
                </p>
                <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300 bg-gray-100 hover:bg-gray-200">
                  <img
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt=""
                  />
                  Sign in with Google
                </a>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                {modalType === "signup" && (
                  <>
                    <label
                      htmlFor="name"
                      className="mb-2 text-sm text-start text-grey-900"
                    >
                      Full Name*
                    </label>
                    <input
                      id="name"
                      type="name"
                      placeholder="Shakil Ahmed"
                      className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-100 focus:bg-gray-200"
                      value={formValues?.full_name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues({
                          ...formValues,
                          full_name: e.target.value,
                        })
                      }
                    />
                  </>
                )}
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-100 focus:bg-gray-200"
                  value={formValues?.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      email: e.target.value,
                    })
                  }
                />
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl bg-gray-100 focus:bg-gray-200"
                  value={formValues?.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      password: e.target.value,
                    })
                  }
                />
                {/* <div className="flex flex-row justify-between mb-8">
                  <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked
                      value=""
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                      <img
                        className="border border-black rounded"
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                        alt="tick"
                      />
                    </div>
                    <span className="ml-3 text-sm font-normal text-grey-900">
                      Keep me logged in
                    </span>
                  </label>
                  <a
                    href="javascript:void(0)"
                    className="mr-4 text-sm font-medium text-purple-blue-500"
                  >
                    Forget password?
                  </a>
                </div> */}
                {modalType === "signin" ? (
                  <button
                    className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none bg-black text-white hover:bg-[#222] transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                    onClick={handleSignin}
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none bg-black text-white hover:bg-[#222] transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                )}
                {modalType === "signin" ? (
                  <div className="flex items-center justify-center gap-x-1">
                    <p className="text-sm leading-relaxed text-grey-900">
                      Not registered yet?
                    </p>
                    <p
                      className="font-bold text-grey-700 cursor-pointer"
                      onClick={() => setModalType("signup")}
                    >
                      Create an Account
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-x-1">
                    <p className="text-sm leading-relaxed text-grey-900">
                      Already have an account?
                    </p>
                    <p
                      className="font-bold text-grey-700 cursor-pointer"
                      onClick={() => setModalType("signin")}
                    >
                      Signin
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
