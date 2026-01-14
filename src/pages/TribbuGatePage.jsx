function TribbuGatePage (){
const { user, isLoading } = useContext(AuthContext);
const navigate = useNavigate();

useEffect(() => {
  if (isLoading) return;  // esperar a que se cargue user

  if (!user) {
    navigate("/login"); // seguridad extra
  } else if (!user.tribbu) {
    navigate("/create-tribbu"); // todavía no tiene tribbu
  } else {
    navigate(`/tribbu/${user.tribbu._id}`); // tiene tribbu
  }
}, [user, isLoading]);
}
export default TribbuGatePage