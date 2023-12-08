import { ReactP5Wrapper } from 'react-p5-wrapper';
import Sketch from './Sketch';

const SelectColor = ({ styles, colors, setColors }) => {
    // スライダーで色が更新されたときに、その値をstateに設定する
    // 新しい色のstateは自動的にReactP5Wrapperにpropsとして渡される

    // console.log(colors.hue1)

    return (
        <div className={styles.container}>
            <ReactP5Wrapper
                sketch={Sketch}
                color1={colors.hue1}
                color2={colors.hue2}
                color3={colors.hue3}
            />
            {/* 色相1のスライダー */}
            <input
                className={styles.input}
                type="range"
                min="0"
                max="360"
                value={colors.hue1}
                onChange={(e) => setColors('hue1', parseInt(e.target.value, 10))}
            />
            <label>Hue 1: {colors.hue1}</label>

            {/* 色相2のスライダー */}
            <input
                className={styles.input}
                type="range"
                min="0"
                max="360"
                value={colors.hue2}
                onChange={(e) => setColors('hue2', parseInt(e.target.value, 10))}
            />
            <label>Hue 2: {colors.hue2}</label>

            {/* 色相3のスライダー */}
            <input
                className={styles.input}
                type="range"
                min="0"
                max="360"
                value={colors.hue3}
                onChange={(e) => setColors('hue3', parseInt(e.target.value, 10))}
            />
            <label>Hue 3: {colors.hue3}</label>
        </div>
    )
}

export default SelectColor;
