package utils.exceptions;

public class SameStatusException extends RuntimeException {

    public SameStatusException() {}
    public SameStatusException(String message) {
        super(message);
    }
}
