package config

import "testing"

func TestLoad_Defaults(t *testing.T) {
	t.Setenv("PHOTOGRAMMETRY_DATA", "")
	t.Setenv("PHOTOGRAMMETRY_PORT", "")
	t.Setenv("PHOTOGRAMMETRY_COLMAP", "")
	cfg, err := Load(nil)
	if err != nil {
		t.Fatalf("Load: %v", err)
	}
	if cfg.DataRoot != defaultDataRoot || cfg.Port != defaultPort || cfg.ColmapPath != defaultColmapPath {
		t.Fatalf("defaults wrong: %+v", cfg)
	}
}

func TestLoad_FlagsOverrideEnv(t *testing.T) {
	t.Setenv("PHOTOGRAMMETRY_DATA", "/env/data")
	t.Setenv("PHOTOGRAMMETRY_PORT", "9000")
	cfg, err := Load([]string{"-data", "/flag/data", "-port", "1234"})
	if err != nil {
		t.Fatalf("Load: %v", err)
	}
	if cfg.DataRoot != "/flag/data" || cfg.Port != 1234 {
		t.Fatalf("flags did not override env: %+v", cfg)
	}
}

func TestLoad_EnvUsedWhenNoFlag(t *testing.T) {
	t.Setenv("PHOTOGRAMMETRY_COLMAP", "/env/colmap")
	cfg, err := Load(nil)
	if err != nil {
		t.Fatalf("Load: %v", err)
	}
	if cfg.ColmapPath != "/env/colmap" {
		t.Fatalf("env not used: %+v", cfg)
	}
}

func TestEnvInt_FallbackOnBadValue(t *testing.T) {
	t.Setenv("PHOTOGRAMMETRY_PORT", "not-a-number")
	cfg, err := Load(nil)
	if err != nil {
		t.Fatalf("Load: %v", err)
	}
	if cfg.Port != defaultPort {
		t.Fatalf("bad port env not ignored: %d", cfg.Port)
	}
}
