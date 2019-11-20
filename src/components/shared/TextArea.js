import React from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';

export default class TextArea extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value: RichTextEditor.createEmptyValue()
      };
  }

  componentWillReceiveProps(nextProps) {
    const { markup } = nextProps;
    if(markup) {
      this.setState({
        value: RichTextEditor.createValueFromString(markup, 'html')
      });
    }
  }

  onChange = (value) => {
    this.setState({value});
    const { onChange, name } = this.props;
    onChange({ target: { name, value: value.toString('html') } });
  };

  render () {
    const { value } = this.state;
    const toolbarConfig = {
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
          {label: 'Bold', style: 'BOLD'},
          {label: 'Italic', style: 'ITALIC'},
          {label: 'Underline', style: 'UNDERLINE'}
        ],
        BLOCK_TYPE_DROPDOWN: [
          {label: 'Normal', style: 'unstyled'},
          {label: 'Heading Large', style: 'header-one'},
          {label: 'Heading Medium', style: 'header-two'},
          {label: 'Heading Small', style: 'header-three'}
        ],
        BLOCK_TYPE_BUTTONS: [
          {label: 'UL', style: 'unordered-list-item'},
          {label: 'OL', style: 'ordered-list-item'}
        ]
    };
     
    return (
      <RichTextEditor
        className='text-area'
        toolbarConfig={toolbarConfig}
        editorClassName='text-editor'
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

TextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired
};