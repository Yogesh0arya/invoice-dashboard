export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 pt-6 pb-24">
        <div className="text-center text-gray-600">
          <h1 className="text-xl">Sparkonomy</h1>
          <p className="sm mb-6 text-gray-400">sparkiing the creator economy</p>
          <p className="text-sm">
            &copy; {currentYear} Yogesh Arya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
