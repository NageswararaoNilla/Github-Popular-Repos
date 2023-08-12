import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, avatarUrl, issuesCount, starsCount, forksCount} = repoDetails

  return (
    <li className="repo-card">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1>{name}</h1>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon-img"
        />
        <p>{starsCount}</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon-img"
        />
        <p>{forksCount}</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon-img"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
