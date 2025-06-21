const Social = () => {
  const socialContent = [
    { id: 1, liveLink: "#", icon: "fa-facebook" },
    { id: 2, liveLink: "#", icon: "fa-x-twitter" },
    { id: 3, liveLink: "#", icon: "fa-instagram" },
    { id: 4, liveLink: "#", icon: "fa-pinterest" },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <li className="list-inline-item" key={item.id}>
          <a href={item.liveLink} target="_blank" rel="noopener noreferrer">
            <i className={`fa ${item.icon}`}></i>
          </a>
        </li>
      ))}
    </>
  );
};

export default Social;
