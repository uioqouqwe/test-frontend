import React from 'react';
import './App.scss';
import ControlForm from './ControlForm';
import ImageCard from './ImageCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
      group: false,
      tags: [],
      tagName: '',
    };
  }

  render() {
    return (
      <div className="app">
        <ControlForm imageUrls={this.state.imageUrls}
                     setImageUrls={urls => this.setState({imageUrls: urls})}
                     setGroup={(group) => this.setState({group})}
                     setTags={(tags) => this.setState({tags})}
                     tagName={this.state.tagName}
                     setTagName={tagName => this.setState({tagName})}/>
                     
        <div className={this.state.group ? 'tag-group-container' : 'image-card-container'}>
          {this.state.group
            ? this.state.tags.map((tagName, tagIndex) => {
              return <div className='tag-group' key={tagIndex}>
                  <p>{tagName}</p>
                  <div className='image-card-group'>
                    {this.state.imageUrls.filter((item) => item.tagName === tagName).map((item, index) => {
                      return <ImageCard url={item.url}
                                        key={index}
                                        tagName={item.tagName}
                                        setTagName={tagName => this.setState({tagName})}/>;
                    })}
                  </div>
                </div>;
            })
            : this.state.imageUrls.map((item, index) => {
            return <ImageCard url={item.url}
                              key={index}
                              tagName={item.tagName}
                              setTagName={tagName => this.setState({tagName})}/>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
