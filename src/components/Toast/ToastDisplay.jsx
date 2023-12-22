const ToastDisplay = ({ notification }) => {
  return (
    <div>
      <h1>
        <b>{notification?.title}</b>
      </h1>
      <p
        style={{
          fontSize: '1rem',
        }}
      >
        {notification?.body}
      </p>
      <img
        src={notification?.image}
        style={{
          width: 'auto',
          height: '50px',
          textAlign: 'center',
          marginLeft: '4.2rem',
        }}
      />
    </div>
  );
};

export default ToastDisplay;
