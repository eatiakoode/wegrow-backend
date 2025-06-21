const Categorie = ({propertytypesidebar}) => {
  return (
    <>
      {propertytypesidebar?.map((item) => (
        <li key={item.typeId}>
          <a href="#">
            <i className="fa fa-caret-right mr10"></i>
            {item.typeName}{" "}
            <span className="float-end">{item.propertyCount} properties</span>
          </a>
        </li>
      ))}
      {/* End li */}

    
    </>
  );
};

export default Categorie;
