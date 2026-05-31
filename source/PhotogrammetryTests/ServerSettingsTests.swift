import XCTest
@testable import Photogrammetry

final class ServerSettingsTests: XCTestCase {
    private var defaults: UserDefaults!
    private var suiteName: String!

    override func setUpWithError() throws {
        suiteName = "ServerSettingsTests-\(UUID().uuidString)"
        defaults = UserDefaults(suiteName: suiteName)
    }

    override func tearDownWithError() throws {
        defaults.removePersistentDomain(forName: suiteName)
    }

    func test_defaultSettingsAreNotConfigured() {
        XCTAssertFalse(ServerSettings.default.isConfigured)
        XCTAssertNil(ServerSettings.default.baseURL)
    }

    func test_whitespaceHostIsNotConfigured() {
        let settings = ServerSettings(host: "   ", port: 8080)
        XCTAssertFalse(settings.isConfigured)
        XCTAssertNil(settings.baseURL)
    }

    func test_baseURLFormatsHostAndPort() {
        let settings = ServerSettings(host: "192.168.1.5", port: 8080)
        XCTAssertEqual(settings.baseURL?.absoluteString, "http://192.168.1.5:8080")
    }

    func test_saveAndLoadRoundTrips() {
        let settings = ServerSettings(host: "10.0.0.42", port: 9000)
        settings.save(to: defaults)
        let loaded = ServerSettings.load(from: defaults)
        XCTAssertEqual(loaded, settings)
    }

    func test_loadWithoutSavedValueReturnsDefault() {
        XCTAssertEqual(ServerSettings.load(from: defaults), .default)
    }
}
