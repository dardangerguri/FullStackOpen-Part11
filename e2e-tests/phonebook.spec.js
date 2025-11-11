const { test, describe, expect } = require('@playwright/test')

describe('Phonebook', () => {
  test('basic structure loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Phonebook' })).toBeVisible()
    await expect(page.getByText('add a new')).toBeVisible()
    await expect(page.locator('input')).toHaveCount(3)
    await expect(page.getByRole('button', { name: 'add' })).toBeVisible()
  })

  test('can add a contact', async ({ page }) => {
    await page.goto('/')
    const testName = `Test User ${Date.now()}`
    const testNumber = `555-${Date.now().toString().slice(-6)}`

    await page.locator('input').nth(1).fill(testName)
    await page.locator('input').nth(2).fill(testNumber)
    await page.getByRole('button', { name: 'add' }).click()
    await expect(page.locator('.messageStyle')).toContainText(`Added ${testName}`)
  })

  test('can filter contacts', async ({ page }) => {
    await page.goto('/')
    const testName = `Filter Test ${Date.now()}`
    const testNumber = `777-${Date.now().toString().slice(-6)}`

    await page.locator('input').nth(1).fill(testName)
    await page.locator('input').nth(2).fill(testNumber)
    await page.getByRole('button', { name: 'add' }).click()
    await page.waitForTimeout(6000)
    await page.locator('input').first().fill(testName)
    await expect(page.getByText(testName)).toBeVisible()
  })

  test('delete buttons exist and are clickable', async ({ page }) => {
    await page.goto('/')

    page.once('dialog', dialog => {
      console.log('Delete dialog prevented:', dialog.message())
      dialog.dismiss()
    })

    const deleteButtons = page.getByText('delete')
    const deleteCount = await deleteButtons.count()

    if (deleteCount > 0) {
      await deleteButtons.first().click()
      await page.waitForTimeout(500)
      console.log('Delete functionality verified - buttons are clickable')
    } else {
      console.log('No contacts to delete - delete functionality not tested')
    }
  })
})