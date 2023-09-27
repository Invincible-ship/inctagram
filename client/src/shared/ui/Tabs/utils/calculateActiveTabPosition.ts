// @ts-nocheck

export function calculateActiveTabPosition() {
  if (typeof window == 'undefined') return

  // define elements
  const $tabs = document.querySelector('[data-name="tabs"]') as Element
  const $activeUnderline = document.querySelector('[data-name="active-underline"') as Element

  // define active tab and calculate active underline position
  let leftPositionActiveTab

  const $activeTab = document.querySelector('[data-selected=true]')
  if (!$activeTab) leftPositionActiveTab = 0

  const tabsRect = $tabs.getBoundingClientRect()
  const activeTabRect = $activeTab?.getBoundingClientRect()
  leftPositionActiveTab = activeTabRect?.left - tabsRect?.left

  const widthActiveTab = activeTabRect?.width as number

  $activeUnderline.style.width = `${widthActiveTab}px`
  $activeUnderline.style.left = `${leftPositionActiveTab}px`
}
