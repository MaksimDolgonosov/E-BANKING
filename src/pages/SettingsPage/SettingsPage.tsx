



const SettingsPage = () => {
    return (
        <div className="settingsPage">
            <div className="settingsPage-photo-wrapper">
                <div className="settingsPage-photo"></div>
                <button>Загрузить фото</button>
            </div>
            <div className="settingsPage-info">
                <form>
                    <input type="text" />
                    <input type="text" />
                </form>
            </div>
        </div>
    )
}
export default SettingsPage;