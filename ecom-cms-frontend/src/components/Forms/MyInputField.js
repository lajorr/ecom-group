const MyInputField = ({ title, type, placeholder, name, isRequired }) => {
  return (
    <div className="w-full lg:w-6/12 px-4">
      <div className="relative w-full mb-3">
        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
          {title}
        </label>
        <input
          type={type}
          name={name}
          required={isRequired}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default MyInputField;
