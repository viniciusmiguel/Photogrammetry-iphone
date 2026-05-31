import SwiftUI

/// Lets the user point the app at a local-network processing server. An empty
/// host keeps the existing on-device pipeline (the offline fallback).
struct SettingsView: View {
    @Bindable var store: ServerSettingsStore

    var body: some View {
        NavigationStack {
            Form {
                Section("Processing Server") {
                    TextField("Host (e.g. 192.168.1.10)", text: $store.settings.host)
                        .keyboardType(.URL)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                    TextField("Port", value: $store.settings.port,
                              format: .number.grouping(.never))
                        .keyboardType(.numberPad)
                }

                Section {
                    statusLabel
                } footer: {
                    Text("When a host is set, finished captures upload their raw "
                        + "sensor data to the server for processing and inspection "
                        + "instead of reconstructing on the phone.")
                }
            }
            .navigationTitle("Settings")
        }
    }

    @ViewBuilder
    private var statusLabel: some View {
        if store.settings.isConfigured, let url = store.settings.baseURL {
            Label("Uploads go to \(url.absoluteString)", systemImage: "checkmark.icloud")
                .font(.footnote)
        } else {
            Label("Not configured — scans process on-device", systemImage: "iphone")
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
    }
}
