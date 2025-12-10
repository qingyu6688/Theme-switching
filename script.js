/**
 * 主题切换逻辑脚本
 * 功能：处理深色/浅色模式的切换、持久化存储以及系统偏好检测
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 获取核心DOM元素
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');
    
    // 初始化逻辑：应用保存的主题或系统偏好
    if (currentTheme) {
        // 如果本地存储中有主题记录，直接应用
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // 如果是深色模式，将开关置为选中状态
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    } else {
        // 如果没有记录，则检测系统是否偏好深色模式
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true;
        }
    }

    /**
     * 切换主题的处理函数
     * @param {Event} e - 事件对象
     */
    function switchTheme(e) {
        // 检查开关是否被选中
        if (e.target.checked) {
            // 切换到深色模式
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // 保存偏好
            console.log('主题已切换为：深色模式');
        } else {
            // 切换到浅色模式
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // 保存偏好
            console.log('主题已切换为：浅色模式');
        }
    }

    // 监听开关的改变事件
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // 监听系统主题变化（可选增强体验）
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
        // 只有当用户没有手动设置过主题时，才跟随系统变化
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            toggleSwitch.checked = e.matches;
        }
    });
});
