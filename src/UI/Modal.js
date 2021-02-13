import React, { Component } from "react";

class Modal extends Component {
  render() {
    const {
      title,
      visible,
      body,
      okButton,
      cancelButton,
      onClickOk,
      onClickCancel,
    } = this.props;
    let rootClassName = "modal fade";
    let rootStyleName;
    if (visible) {
      rootClassName += " d-block show";
      rootStyleName = {
        backgroundColor: "#000000b0",
      };
    }
    return (
      <div className={rootClassName} style={rootStyleName}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
            </div>
            <div className="modal-body">{body}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClickCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClickOk}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
