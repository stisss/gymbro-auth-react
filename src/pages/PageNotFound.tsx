import { Link } from "react-router-dom"

const style = {
  color: "white",
  fontSize: "2rem",
}

export const PageNotFound: React.FC = () => {
  return (
    <Link style={style} to="/">
      Back to welcome page
    </Link>
  )
}
