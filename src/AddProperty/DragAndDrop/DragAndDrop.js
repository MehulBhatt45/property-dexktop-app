import React, { Component } from 'react'
class DragAndDrop extends Component {
  constructor(props){
    super(props)
    this.state = {
      drag: false,
    }
  }
  dragCounter= 0;
  dropRef = React.createRef()
  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
      this.dragCounter = 0    
    }
  }
  componentDidMount() {
    console.log("THIS>PROPS in D&D COMPONENT===============>", this.props)
    this.handleFileChange = this.handleFileChange.bind(this);
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

  handleFileChange = (e) => {
    console.log(e.target.files);
    this.props.handleDrop(e.target.files)
  }
  render() {
    return (
      <div
        style={{display: 'inline-block', position: 'relative', border: 'dashed 2px grey', width: '100%'}}
        ref={this.dropRef}
        onClick={()=>{document.getElementById('filechange').click()}}
      >
          <input id="filechange" placeholder="Add Images of Floor Plan" type="file" multiple onChange={this.handleFileChange} hidden/>
        {this.state.drag &&
          <div 
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0, 
              right: 0,
              zIndex: 9999
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}
export default DragAndDrop