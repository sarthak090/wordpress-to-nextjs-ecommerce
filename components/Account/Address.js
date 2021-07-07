export default function Address({ userData, title }) {
  return (
    <div className="text-gray-800">
      <h4 className="text-2xl mb-4 font-semibold">{title}</h4>
      {Object.keys(userData.billingAddress).map((key, i) => (
        <div key={i}>
          <strong className="mr-2">{key.split("_").join(" ")}:</strong>
          {userData.billingAddress[key]}
        </div>
      ))}
    </div>
  );
}
