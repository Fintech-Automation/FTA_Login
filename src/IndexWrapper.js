import styled from 'styled-components';

export const IndexWrapper = styled.div`
  .ant-table table {
    table-layout: fixed !important;
  }

  .word-wrap {
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
  }
  .input-red .ant-input-affix-wrapper {
    border: 1px red solid;
  }
  .text-cap {
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ant-table-wrapper.subtable {
    padding-left: 40%;
  }

  .ant-picker-cell-inner {
    text-align: center !important;
  }

  .AddButton {
    color: #0c9;
    font-size: 24px;
  }

  .MinusButton {
    color: #ff8d00;
    font-size: 24px;
  }

  .MailButton {
    color: #1f3eae;
    font-size: 20px;
  }

  .EditButton {
    color: #1f3eae;
    font-size: 20px;
  }

  .body {
    font-family: 'Lato', 'sans-serif';
  }

  .formHeader {
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0px;
    font-kerning: normal;
  }

  .lgHeader {
    font-size: 20px;
  }
  [title='Use this number to update the daytime phone number on this account'] {
    font-size: 10px !important;
  }
  .title {
    font-weight: 700;
    font-size: 32px;
    text-align: left;
    margin-top: 0.5rem;
  }
  .title-desc {
    font-size: 18px;
    text-align: left;
    margin-top: 0.5rem;
  }
  .sub-title {
    font-weight: 700;
    font-size: 12px;
    text-align: justify;
  }
  .sub-title-1 {
    font-size: 16px;
    text-align: justify;
  }
  .mHeader {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    text-align: left;
    color: #506982;
    border-bottom: 1px solid #506982;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 12px;
    text-align: justify;
  }

  .sHeader {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 14px;
    text-align: left;
    color: #506982;
    border-bottom: 1px solid #506982;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .top5Adj {
    padding-top: 5px;
  }

  .slds-path__link {
    float: left;
    padding-left: 3rem;
  }

  .slds-path__track {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }

  .slds-modal__container {
    width: 80%;
    // max-width: 70rem;
    min-width: 20rem;
  }

  input[type='checkbox'] {
    width: 15px !important;
    height: 15px !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    outline: 2px solid #ff9800;
    box-shadow: none;
    font-size: 2em;
  }

  input[type='checkbox']:checked {
    background-color: #ff9800 !important;
    color: #ffffff !important;
  }

  .slds-path__item:first-child {
    border-top-left-radius: 0rem !important;
    border-bottom-left-radius: 0rem !important;
    width: 20rem !important;
    white-space: nowrap;
  }

  .slds-path__item:last-child {
    border-top-right-radius: 0rem !important;
    border-bottom-right-radius: 0rem !important;
  }
  .slds-path__item {
    min-width: 90% !important;
    padding-left: 2rem;
  }
  .slds-path__nav .slds-is-active .slds-path__title {
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .task {
    flex: 1;
    float: left;
  }
  .progressLen {
    min-width: 25%;
  }
  .Left5Percent {
    margin-left: 9%;
    margin-right: 8%;
  }

  .Left12Percent {
    margin-left: 12%;
    margin-right: 8%;
  }

  .timelineExpand {
    transform: rotate(0deg);
  }

  .iconUp {
    top: -10px;
    position: relative;
    margin-bottom: -10px;
  }

  .leftIndent20 {
    width: 70%;
    margin-left: 20%;
  }

  .cardComplete {
    margin-top: 7px;
    color: white;
    padding: 7px;
    display: flex;
    border-bottom: 1px solid #969492;
  }

  .rightCheckbox {
    float: right;
  }

  .leftDescription {
    float: left;
    flex: 1;
  }

  .expand {
    transform: rotate(90deg);
  }

  .close {
    transform: rotate(0deg);
  }

  .slds-tabs_default__nav {
    padding-left: 35%;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  .body {
    font-family: 'Lato', 'sans-serif';
  }

  .formHeader {
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0px;
    font-kerning: normal;
  }

  .lgHeader {
    font-size: 20px;
  }

  .mHeader {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 18px;
    text-align: left;
    color: #506982;
    border-bottom: 1px solid #506982;
    margin-top: 0.5rem;
  }

  .top5Adj {
    padding-top: 5px;
  }
  /*
  .slds-card__footer{
  border-top:none;
  }
  
  .flowruntimeBody.centerWrapper{
  float: left;
  }
  
  label.uiLabel.flowruntimeInputWrapper {
  width: 50%;
  float: left;
  padding-right: 10px;
  z-index: 99;
  }
  
  fieldset.slds-form-element.flowruntimeRadioButtonInput {
  width: 50%;
  float: left;
  padding-right: 10px;
  z-index: 99;
  }
  
  .flowruntimeErrorText.errorText{
  width: 50%;
  position: initial;
  }
  */

  .alert-table td {
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    position: relative;
    transition: all 300ms;
    text-align: left;
  }

  .alert-table th,
  .alert-table td {
    padding: 4px 3px;
  }

  tr.Profile3Row {
    font-weight: 600;
  }

  tr {
    -webkit-animation: fadin 0.5s;
    -moz-animation: fadein 0.5s;
    -ms-animation: fadein 0.5s;
    -o-animation: fadein 0.5s;
    animation: fadein 0.5s;
  }
  tr.Profile5Row td {
    font-size: 8pt !important;
    /* color: red; */
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }

  tr.header {
    font-size: 12px;
    text-transform: uppercase;
    background: rgb(201, 199, 197);
    border-bottom: 2px solid green;
    font-weight: 700;
  }

  tr.footer {
    font-weight: 700;
  }

  .content td:nth-child(1) {
    color: green;
    text-decoration: underline;
  }

  .red {
    color: red;
  }

  .filter {
    width: 100%;
    background: rgb(0 128 0 / 20%);
    padding: 1rem;
  }

  .ant-form-item {
    margin-bottom: 0 !important;
  }

  .ant-form-vertical .ant-form-item-label,
  .ant-col-24.ant-form-item-label,
  .ant-col-xl-24.ant-form-item-label {
    border-radius: 3px 0px 0px 3px;
    padding: 0;
  }

  .card:hover {
    box-shadow: rgb(170 170 170) 0px 0px 8px 0px;
    cursor: pointer;
  }

  .box {
    position: relative;
    display: inline-block;
    width: 98%;
    margin: 0.6rem;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    transition: all 0.2s;
    padding: 1rem;
    margin-top: 0;
  }

  .align-center {
    display: flex !important;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }
  .mHeaderb {
    font-weight: 700;
    font-size: 14pt;
    text-align: center;
    margin: 0.7rem 0 0.7rem 0;
  }

  .container {
    margin: auto !important;
    max-width: 100% !important;
    padding: 0 20px;
  }
  .slds-path__nav {
    margin-bottom: 0;
  }

  .subtable .ant-table-thead > tr > th,
  .subtable .ant-table-tbody > tr > td,
  .subtable .ant-table tfoot > tr > th,
  .subtable .ant-table tfoot > tr > td {
    padding: 0;
  }

  .ant-table-tbody > tr > td > .ant-table-wrapper:only-child .ant-table {
    margin: -10px -16px -16px 33px !important;
  }

  .ant-row {
    margin-left: 0px !important;
  }

  .switchTransition {
    -webkit-animation: fadin 0.5s;
    -moz-animation: fadein 0.5s;
    -ms-animation: fadein 0.5s;
    -o-animation: fadein 0.5s;
    animation: fadein 0.5s;
  }
  .ant-result-extra {
    display: inline-flex !important;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-ms-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  th.ant-table-cell {
    font-size: 11px;
    text-align: left;
    text-transform: uppercase;
    background: #fafafa;
    font-weight: bold !important;
  }

  .ant-picker-dropdown,
  .ant-table table,
  .ant-form,
  .ant-tab,
  .ant-input,
  .ant-select,
  .ant-picker,
  .ant-picker-input input,
  .ant-page-header,
  .ant-form-item-label > label,
  .ant-card,
  .ant-radio-button-wrapper,
  .ant-select-item,
  .ant-btn,
  .ant-pagination {
    font-size: 12px !important;
  }

  .ant-picker {
    height: 2rem;
  }
  .indexContainer {
    min-width: 100%;
    min-height: 25rem;
  }
  .indexSpin {
    max-height: 100% !important;
  }
  .ant-input-disabled {
    color: rgb(0, 0, 0) !important;
    background-color: rgb(241, 244, 251) !important;
}
`;
