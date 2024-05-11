import '../App.css';

function HeaderUtama({handleShowGroup}) {

  return (
    <>
      {/* HEADER APP */}
      <header className="App-header"> 
        <div className='Header-menu'> 

          <div className="Right-side">
            <div className="Heading">
              <h3 className="Header-brand">Product Roadmap</h3>
            </div>
            <div className="Button flex-container">
              <button type="button" className="btn-newgroup" onClick={handleShowGroup}><i className="fa-solid fa-plus"></i> Add New Group</button>
            </div>
          </div>

          <div className="Left-side"></div>
        </div>      
      </header>
      <hr></hr>

    </>
  );
}

export default HeaderUtama;
