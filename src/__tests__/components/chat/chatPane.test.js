import React from 'react';
import { mount } from 'enzyme';
import ChatPane from '../../../components/chat/ChatPane';
import { chats } from "../../../__mocks__/chats";

describe('ChatPane tests', ()=>{
    let wrapperMount;
    beforeEach(()=>{
        const scrollIntoViewMock = jest.fn();
        const scrollToBottom = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
        window.HTMLElement.prototype.scrollToBottom = scrollToBottom;

        wrapperMount = mount(<ChatPane chats={chats}
             handleSubmit={jest.fn()}
             handleInput={jest.fn()}
             />);
    });
    it('Should render with mount', done =>{
        expect(wrapperMount).toHaveLength(1);
        done();
    });

    it('Should updated component', done =>{
        wrapperMount.find('#messageText').props().onChange({ target: { name: 'messageText', value: 'Hellow' } });
        done();
    });
});