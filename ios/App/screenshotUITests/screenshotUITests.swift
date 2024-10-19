//
//  screenshotUITests.swift
//  screenshotUITests
//
//  Created by Wang, Chih Jeff on 9/3/24.
//

import XCTest

final class screenshotUITests: XCTestCase {

    @MainActor override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
        XCUIDevice.shared.orientation = .portrait
        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
        
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    @MainActor func testExample() throws {
        // UI tests must launch the application that they test.

        // Use XCTAssert and related functions to verify your tests produce the correct results.
        
        let app = XCUIApplication()
        let query = app.webViews.webViews.webViews
        
        // Wait for the UI to complete loading
        sleep(2)
        
        query/*@START_MENU_TOKEN@*/.buttons["menu-button"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"banner\"].buttons[\"menu-button\"]",".buttons[\"menu-button\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
        sleep(1)
        query/*@START_MENU_TOKEN@*/.buttons["currency"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"main\"]",".otherElements[\"currency\"].buttons[\"currency\"]",".buttons[\"currency\"]"],[[[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,3],[-1,2],[-1,1,2]],[[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/.tap()
        sleep(1)
        query.otherElements["Standard"].tap()
        query/*@START_MENU_TOKEN@*/.buttons["OK"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"web alert dialog\"].buttons[\"OK\"]",".buttons[\"OK\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
        
        // Screenshot standard currency (JPY) settings
        let input = query.textFields["code"]
        input.tap()
        input.doubleTap()
        app/*@START_MENU_TOKEN@*/.keys["delete"]/*[[".keyboards.keys[\"delete\"]",".keys[\"delete\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
        app/*@START_MENU_TOKEN@*/.keys["j"]/*[[".keyboards.keys[\"j\"]",".keys[\"j\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
        app/*@START_MENU_TOKEN@*/.keys["p"]/*[[".keyboards.keys[\"p\"]",".keys[\"p\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
        app/*@START_MENU_TOKEN@*/.keys["y"]/*[[".keyboards.keys[\"y\"]",".keys[\"y\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
//        app.toolbars["Toolbar"].buttons["Done"].tap()
        query.staticTexts["Code"].tap()
        snapshot("JPY")
        
        // Screenshot custom currency settings
        query.otherElements["Standard"].tap()
        query/*@START_MENU_TOKEN@*/.otherElements["Custom"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"web alert dialog\"].otherElements[\"Custom\"]",".otherElements[\"Custom\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
        query/*@START_MENU_TOKEN@*/.buttons["OK"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"web alert dialog\"].buttons[\"OK\"]",".buttons[\"OK\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
        snapshot("custom")
        
        // Screenshot the main screen
        query.buttons["Confirm"].tap()
        sleep(1)
        query.buttons["Back"].tap()
        sleep(1)
        snapshot("main")

        // Screenshot add entry
        query/*@START_MENU_TOKEN@*/.buttons["Add entry"]/*[[".otherElements[\"Allowly\"].buttons[\"Add entry\"]",".buttons[\"Add entry\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
        app/*@START_MENU_TOKEN@*/.keys["2"]/*[[".keyboards.keys[\"2\"]",".keys[\"2\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
        app/*@START_MENU_TOKEN@*/.keys["0"]/*[[".keyboards.keys[\"0\"]",".keys[\"0\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
        snapshot("add-entry")
        query.buttons["close"].tap()
        
        // Reset currency to standard
        query/*@START_MENU_TOKEN@*/.buttons["menu-button"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"banner\"].buttons[\"menu-button\"]",".buttons[\"menu-button\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
        sleep(1)
        query/*@START_MENU_TOKEN@*/.buttons["currency"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"main\"]",".otherElements[\"currency\"].buttons[\"currency\"]",".buttons[\"currency\"]"],[[[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,3],[-1,2],[-1,1,2]],[[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/.tap()
        sleep(1)
        query.otherElements["Custom"].tap()
        query.otherElements["Standard"].tap()
        query/*@START_MENU_TOKEN@*/.buttons["OK"]/*[[".otherElements[\"Allowly\"]",".otherElements[\"web alert dialog\"].buttons[\"OK\"]",".buttons[\"OK\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
        query.buttons["Confirm"].tap()
    }
}
