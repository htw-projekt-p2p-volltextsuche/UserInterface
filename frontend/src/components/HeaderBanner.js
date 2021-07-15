import htw_logo from "../htw_logo.jpg"
function HeaderBanner(params) {
  return (
    <div className="banner">
        <img src={htw_logo} alt="logo" className="htwlogo"></img>
      <h1 className="projectName">P2P Volltextsuche</h1>
    </div>
  )
}
export default HeaderBanner
