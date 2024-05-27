const GlobalNoDataFound = ({ missingItem }) => {
  return (
    <main>
      <p
        className="text-center text-danger lh-lg fw-semibold"
        style={{ cursor: "pointer" }}
      >
        It Seems Like There Isn't Any {missingItem} Yet.Try Creating Or Adding
        One.
      </p>
    </main>
  );
};

export default GlobalNoDataFound;
