import logo from "/images/tribbu-logo-navigator.svg"

function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <img className="max-h-18 mx-auto mb-4" src={logo} alt="" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-base-content/90 text-gray-800 mb-6">{description}</p>
      {action}
    </div>
  );
}

export default EmptyState