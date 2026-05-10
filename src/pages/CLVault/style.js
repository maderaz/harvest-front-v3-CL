import styled from 'styled-components'

export const Page = styled.div`
  width: 100%;
  padding: 28px 32px 64px;
  color: ${p => p.$fontcolor1};
  background: ${p => p.$bgcolor};
  min-height: 100vh;

  @media (max-width: 992px) {
    padding: 20px 16px 64px;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const TokenIcons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  > div {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${p => p.$bg};
    border: 2px solid ${p => p.$border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    color: ${p => p.$fc};
  }
  > div:nth-child(2) {
    margin-left: -12px;
  }
`

export const HeaderTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: ${p => p.$fc};

  span.muted {
    font-weight: 500;
    color: ${p => p.$muted};
  }
  span.dot {
    color: ${p => p.$muted};
    margin: 0 8px;
  }
`

export const HeaderSubtitle = styled.div`
  font-size: 14px;
  color: ${p => p.$muted};
  font-weight: 500;
`

export const HeaderRight = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`

export const Chip = styled.div`
  padding: 6px 12px;
  border: 1px solid ${p => p.$border};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.$fc};
  background: ${p => p.$bg};
`

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: ${p => (p.$ok ? '#e7f8ec' : '#fdecec')};
  color: ${p => (p.$ok ? '#137a3a' : '#a8201f')};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${p => (p.$ok ? '#1da64a' : '#d6342f')};
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`

export const ColLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`

export const ColRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`

export const Card = styled.div`
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  border-radius: 14px;
  padding: 20px 22px;
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${p => (p.$noMargin ? 0 : '16px')};
  cursor: ${p => (p.$clickable ? 'pointer' : 'default')};
`

export const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${p => p.$fc};
`

export const CardSub = styled.div`
  font-size: 12px;
  color: ${p => p.$muted};
  font-weight: 500;
`

export const RangeBarOuter = styled.div`
  position: relative;
  height: 36px;
  background: ${p => p.$bg};
  border-radius: 10px;
  overflow: visible;
  margin: 18px 0 12px;
`

export const RangeBarInner = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${p => p.$leftPct}%;
  right: ${p => 100 - p.$rightPct}%;
  background: linear-gradient(90deg, #5dcf46 0%, #51e932 50%, #5dcf46 100%);
  border-radius: 8px;
  opacity: 0.85;
`

export const RangeMarker = styled.div`
  position: absolute;
  top: -8px;
  bottom: -8px;
  left: ${p => p.$pct}%;
  width: 3px;
  background: ${p => p.$color};
  border-radius: 2px;
  transform: translateX(-50%);

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${p => p.$color};
    border: 2px solid ${p => p.$bg};
  }
`

export const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${p => p.$muted};
  font-weight: 600;
`

export const RangeNumbers = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 14px;

  strong {
    color: ${p => p.$fc};
    font-weight: 700;
  }
  span.muted {
    color: ${p => p.$muted};
  }
`

export const Footnote = styled.div`
  margin-top: 14px;
  font-size: 12px;
  color: ${p => p.$muted};
`

export const CompositionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: ${p => p.$fc};
  font-weight: 600;
`

export const CompositionBar = styled.div`
  display: flex;
  height: 14px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${p => p.$border};
  margin: 8px 0 14px;
`

export const CompositionFill = styled.div`
  width: ${p => p.$pct}%;
  background: ${p => p.$color};
`

export const KVList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const KVRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  padding: 6px 0;
  border-bottom: 1px dashed ${p => p.$border};

  &:last-child {
    border-bottom: none;
  }

  > span:first-child {
    color: ${p => p.$muted};
    font-weight: 500;
  }
  > span:last-child {
    color: ${p => p.$fc};
    font-weight: 700;
  }
`

export const Para = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: ${p => p.$fc};
  margin: 0 0 12px;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${p => p.$accent};
    font-weight: 700;
  }
`

export const Caret = styled.span`
  font-size: 12px;
  color: ${p => p.$muted};
  transition: transform 0.15s ease;
  transform: rotate(${p => (p.$open ? '180deg' : '0deg')});
`

export const TabRow = styled.div`
  display: flex;
  border-bottom: 1px solid ${p => p.$border};
  margin: -22px -22px 18px;
  padding: 0 22px;
`

export const Tab = styled.button`
  background: none;
  border: none;
  padding: 14px 0;
  margin-right: 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${p => (p.$active ? p.$fc : p.$muted)};
  border-bottom: 2px solid ${p => (p.$active ? '#5dcf46' : 'transparent')};
  cursor: pointer;

  &:hover {
    color: ${p => p.$fc};
  }
`

export const FieldLabel = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: ${p => p.$muted};
  margin-bottom: 6px;

  span.bal {
    color: ${p => p.$fc};
    font-weight: 600;
  }
`

export const FieldBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${p => p.$border};
  border-radius: 10px;
  padding: 10px 12px;
  background: ${p => p.$bg};
  margin-bottom: 12px;

  &:focus-within {
    border-color: #5dcf46;
  }
`

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  font-weight: 600;
  color: ${p => p.$fc};
  min-width: 0;

  &::placeholder {
    color: ${p => p.$muted};
  }
`

export const TokenPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: ${p => p.$fc};
`

export const Hint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${p => p.$muted};
  margin: 0 0 10px;
  gap: 8px;

  > button {
    background: none;
    border: 1px solid ${p => p.$border};
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 600;
    color: ${p => p.$fc};
    cursor: pointer;

    &:hover {
      background: ${p => p.$hover};
    }
  }
`

export const Preview = styled.div`
  background: ${p => p.$bg};
  border: 1px dashed ${p => p.$border};
  border-radius: 10px;
  padding: 12px;
  font-size: 12.5px;
  color: ${p => p.$fc};
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  > div {
    display: flex;
    justify-content: space-between;
  }
  span.muted {
    color: ${p => p.$muted};
    font-weight: 500;
  }
  span.val {
    font-weight: 700;
  }
`

export const RouteNote = styled.div`
  font-size: 11.5px;
  color: ${p => p.$muted};
  font-style: italic;
  margin-bottom: 10px;
`

export const OutputGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
`

export const OutputOpt = styled.button`
  flex: 1;
  padding: 10px 8px;
  border: 1px solid ${p => (p.$active ? '#5dcf46' : p.$border)};
  background: ${p => (p.$active ? '#eafbe6' : p.$bg)};
  color: ${p => (p.$active ? '#137a3a' : p.$fc)};
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: #5dcf46;
  }
`

export const Cta = styled.button`
  width: 100%;
  padding: 14px;
  background: #5dcf46;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #51e932;
  }

  &:disabled {
    background: #b6d8ad;
    cursor: not-allowed;
  }
`

export const ChartPlaceholder = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$bg};
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$muted};
`

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
  gap: 16px;
`

export const ChartHeaderCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ChartLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.$color};
`

export const ChartMeta = styled.span`
  font-size: 12px;
  color: ${p => p.$muted};
  font-weight: 500;

  strong {
    color: ${p => p.$fc};
    font-weight: 700;
    margin-left: 4px;
  }
`

export const ChartFrame = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 10px;
  background: ${p => p.$bg};
  overflow: hidden;
  padding: 12px 6px;
  box-sizing: border-box;
`

export const AxisYLeft = styled.div`
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10.5px;
  color: ${p => p.$muted};
  font-weight: 500;
  pointer-events: none;
`

export const AxisYRight = styled(AxisYLeft)`
  left: auto;
  right: 6px;
  align-items: flex-end;
`

export const AxisX = styled.div`
  position: absolute;
  left: 56px;
  right: 56px;
  bottom: 6px;
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: ${p => p.$muted};
  font-weight: 500;
`

export const ChartCenterText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$muted};
  pointer-events: none;
`

export const RangeBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 10px;
`

export const RangeBtn = styled.button`
  background: none;
  border: none;
  padding: 4px 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${p => (p.$active ? '#5dcf46' : p.$muted)};
  cursor: pointer;

  &:hover {
    color: ${p => p.$fc};
  }
`

export const TopBoxRow = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  margin-bottom: 25px;

  @media (max-width: 992px) {
    flex-wrap: wrap;
    gap: 12px;
  }
`

export const TopBox = styled.div`
  flex: 1;
  background: ${p => p.$bg};
  border: 2px solid ${p => p.$border};
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;

  @media (max-width: 992px) {
    flex-basis: calc(50% - 6px);
  }
`

export const TopBoxTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$muted};
`

export const TopBoxValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.$fc};
  letter-spacing: -0.4px;
`

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`

export const DetailsCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.$fc};
  padding: 12px 18px;
  border-bottom: 1px solid ${p => p.$border};
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  font-size: 13px;
  border-bottom: 1px solid ${p => p.$border};

  &:last-child {
    border-bottom: none;
  }

  > span:first-child {
    color: ${p => p.$muted};
    font-weight: 500;
  }
  > span:last-child {
    color: ${p => p.$fc};
    font-weight: 600;
  }
`

export const SourceText = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: ${p => p.$fc};
  margin: 0 0 14px;

  strong {
    color: ${p => p.$fc};
    font-weight: 700;
    border-bottom: 1px dashed ${p => p.$muted};
  }
`

export const AddressBtnRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const AddressBtn = styled.button`
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  color: ${p => p.$fc};
  cursor: pointer;

  &:hover {
    border-color: #5dcf46;
    color: #5dcf46;
  }
`

export const TipBox = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  border-radius: 10px;
  margin: 14px 18px 18px;
`

export const TipBoxIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1da64a;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
`

export const TipBoxText = styled.div`
  font-size: 12.5px;
  line-height: 1.45;
  color: ${p => p.$fc};

  strong {
    color: ${p => p.$accent};
    font-weight: 700;
    margin-bottom: 4px;
    display: block;
  }
  a {
    color: #1da64a;
    font-weight: 600;
    text-decoration: underline;
  }
`

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 8px;

  > span:first-child {
    color: ${p => p.$muted};
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  > span:last-child {
    color: ${p => p.$fc};
    font-weight: 700;
  }
`

export const Slippage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: ${p => p.$muted};
  margin-bottom: 12px;

  > div {
    display: flex;
    gap: 6px;

    button {
      padding: 3px 8px;
      border: 1px solid ${p => p.$border};
      background: ${p => p.$bg};
      color: ${p => p.$fc};
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }
    button.active {
      border-color: #5dcf46;
      background: #eafbe6;
      color: #137a3a;
    }
  }
`
