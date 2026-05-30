import XCTest

extension XCTestCase {
    /// Yields the cooperative thread until `condition` holds or the budget is
    /// exhausted. Lets a view model's background listen-`Task` drain an
    /// `AsyncStream` deterministically without arbitrary sleeps (keeps tests
    /// fast + repeatable per F.I.R.S.T).
    @MainActor
    func eventually(
        _ condition: () -> Bool,
        iterations: Int = 1000,
        file: StaticString = #filePath,
        line: UInt = #line
    ) async {
        for _ in 0..<iterations {
            if condition() { return }
            await Task.yield()
        }
        XCTFail("Condition was never satisfied", file: file, line: line)
    }
}
