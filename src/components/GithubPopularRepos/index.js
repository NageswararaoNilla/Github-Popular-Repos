import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    githubReposList: [],
    languageId: languageFiltersData[0].id,
    isFailure: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getRepos()
  }

  successView = dataList => {
    const updateData = dataList.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))
    this.setState({
      githubReposList: updateData,
      isFailure: false,
      isLoading: false,
    })
  }

  getRepos = async () => {
    this.setState({isLoading: true})
    const {languageId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${languageId}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.successView(data.popular_repos)
    } else {
      this.setState({isFailure: true})
    }
  }

  updateActiveId = selectId => {
    this.setState({languageId: selectId}, this.getRepos)
  }

  getRepositories = () => {
    const {githubReposList, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          <ul className="repos-container">
            {githubReposList.map(eachRepo => (
              <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  getFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  render() {
    const {isFailure, languageId} = this.state
    // console.log(languageId)
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1>Popular</h1>
          <ul className="languages-list">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                key={eachLanguage.id}
                languageDetails={eachLanguage}
                updateActiveId={this.updateActiveId}
                isActiveId={languageId === eachLanguage.id}
              />
            ))}
          </ul>
          {isFailure ? this.getFailureView() : this.getRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
