import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateActiveId, isActiveId} = props
  const {id, language} = languageDetails
  const onClickButton = () => {
    updateActiveId(id)
  }

  const btnClass = isActiveId ? 'btn active-btn' : 'btn'

  return (
    <li className="list-item">
      <button type="button" className={btnClass} onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
